using CoreysGameOfLife.Models;
using Microsoft.AspNetCore.SignalR;

namespace CoreysGameOfLife.WebSocket
{
    public class SocketDataTransfer : Hub
    {
        private static SocketDataTransfer _instance;
        private readonly GameOfLifeBoard _gameOfLifeBoard;
        private CancellationTokenSource _cancellationTokenSource;
        public SocketDataTransfer(GameOfLifeBoard gameOfLifeBoard)
        {
            _gameOfLifeBoard = gameOfLifeBoard;
            _instance = this;  // Store the instance in the shared variable
        }

        public static void CancelSendingData()
        {
            _instance?._cancellationTokenSource?.Cancel();
        }

        public async Task StartSendingData()
        {
            _cancellationTokenSource = new CancellationTokenSource();

            while (!_cancellationTokenSource.IsCancellationRequested)
            {
                var currentData = _gameOfLifeBoard.RunIteration();
                await Clients.All.SendAsync("ReceiveData", currentData);
                await Task.Delay(100);
            }
        }
    }
}