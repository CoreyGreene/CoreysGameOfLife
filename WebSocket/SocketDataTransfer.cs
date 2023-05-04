﻿using CoreysGameOfLife.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
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
            // _gameOfLifeBoard.PrintGrid();
            // find a way to get data from the board
            // pass data to 'the algorithm'
            // send the result fo the algorith to the front end
            // send the result of the algorith.. back to the algorithm

           // var currentData = _gameOfLifeBoard.RunIteration();
           // await Clients.All.SendAsync("ReceiveData", currentData);
            for (int i = 1; i <= 1000; i++)
            {

                var currentData = _gameOfLifeBoard.RunIteration();
                await Clients.All.SendAsync("ReceiveData", currentData);
                await Task.Delay(200); 
            }
        }
    }
}