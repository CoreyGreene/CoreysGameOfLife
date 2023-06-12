using CoreysGameOfLife.Models;
using Microsoft.AspNetCore.SignalR;

namespace CoreysGameOfLife.WebSocket
{
    public class SocketDataTransfer : Hub
    {
        private readonly GameOfLifeBoard gameOfLifeBoard;
        public SocketDataTransfer(GameOfLifeBoard gameOfLifeBoard)
        {
            this.gameOfLifeBoard = gameOfLifeBoard;
        }

        public static void ResetIteration()
        {
            CancelEventSingleton.GetInstance().ResetIteration();
        }

        public static void CancelSendingData()
        {
            CancelEventSingleton.GetInstance().CancelIteration();
        }

        public async Task StartSendingData()
        {
            while (!CancelEventSingleton.GetInstance().ShouldCancelIternation())
            {
                var currentData = gameOfLifeBoard.RunIteration();
                await Clients.All.SendAsync("ReceiveData", currentData);
                await Task.Delay(1000);
            }
        }
    }
}