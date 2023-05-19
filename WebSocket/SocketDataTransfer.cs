using CoreysGameOfLife.Models;
using Microsoft.AspNetCore.SignalR;

namespace CoreysGameOfLife.WebSocket
{
    public class SocketDataTransfer : Hub
    {
        private static SocketDataTransfer instance;
        private readonly GameOfLifeBoard gameOfLifeBoard;
        private CancellationTokenSource cancellationTokenSource;
        public SocketDataTransfer(GameOfLifeBoard gameOfLifeBoard)
        {
            this.gameOfLifeBoard = gameOfLifeBoard;
            instance = this;
        }

        public static void CancelSendingData()
        {
            instance?.cancellationTokenSource?.Cancel();
        }

        public async Task StartSendingData()
        {
            cancellationTokenSource = new CancellationTokenSource();

            while (!cancellationTokenSource.IsCancellationRequested)
            {
                var currentData = gameOfLifeBoard.RunIteration();
                await Clients.All.SendAsync("ReceiveData", currentData);
                await Task.Delay(100);
            }
        }
    }
}