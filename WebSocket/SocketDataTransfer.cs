using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace CoreysGameOfLife.WebSocket
{
    public class SocketDataTransfer : Hub
    {
        public async Task StartSendingData()
        {
            for (int i = 1; i <= 100; i++)
            {
                await Clients.All.SendAsync("ReceiveData", i);
                await Task.Delay(50); 
            }
        }
    }
}