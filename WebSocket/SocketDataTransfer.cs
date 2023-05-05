using CoreysGameOfLife.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Diagnostics;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;

namespace CoreysGameOfLife.WebSocket
{
    public class SocketDataTransfer : Hub
    {
        private readonly GameOfLifeBoard _gameOfLifeBoard;
        public SocketDataTransfer(GameOfLifeBoard gameOfLifeBoard)
        {
            _gameOfLifeBoard = gameOfLifeBoard;
        }

        public async Task StartSendingData()
        {
            var watch = System.Diagnostics.Stopwatch.StartNew();
   
            for (int i = 1; i <= 1000; i++)
            {
                var currentData = _gameOfLifeBoard.RunIteration();
                await Clients.All.SendAsync("ReceiveData", currentData);
                await Task.Delay(200); 
            }
           watch.Stop();
           var elapsedMs = watch.ElapsedMilliseconds;
           Trace.WriteLine("the time: "+ elapsedMs);
        }
    }
}