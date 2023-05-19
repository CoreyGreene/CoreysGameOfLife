using System.Text.Json;
using CoreysGameOfLife.Models;
using CoreysGameOfLife.WebSocket;
using Microsoft.AspNetCore.Mvc;

namespace CoreysGameOfLife.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GameOfLifeController : ControllerBase
    {
        private readonly ILogger<GameOfLifeController> _logger;
        private readonly GameOfLifeBoard _gameOfLifeBoard;


        public GameOfLifeController(
            ILogger<GameOfLifeController> logger,
            GameOfLifeBoard gameOfLifeBoard
            )
        {
            _logger = logger;
            _gameOfLifeBoard = gameOfLifeBoard;
        }

        public class MyDataModel
        {
            public string stringData { get; set; }
        }

        [HttpPost]
        [Route("StartSimulation")]
        public IActionResult StartSimulation([FromBody] MyDataModel data)
        {
            int[][] boardData = JsonSerializer.Deserialize<int[][]>(data.stringData);
            var numRows = boardData.Length;
            var numCols = boardData[0].Length;
            _gameOfLifeBoard.CreateBoard(numRows, numCols);
            _gameOfLifeBoard.SetBoards(boardData);
            return Ok();
        }

        [HttpPost]
        [Route("StopSimulation")]
        public IActionResult StopSimulation()
        {
            SocketDataTransfer.CancelSendingData();

            return Ok();
        }
    }
}