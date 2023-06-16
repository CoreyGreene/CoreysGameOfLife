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
        private readonly GameOfLifeBoard gameOfLifeBoard;


        public GameOfLifeController(
            ILogger<GameOfLifeController> logger,
            GameOfLifeBoard gameOfLifeBoard
            )
        {
            _logger = logger;
            this.gameOfLifeBoard = gameOfLifeBoard;
        }

        public class MyDataModel
        {
            public string stringData { get; set; }
        }

        [HttpPost]
        [Route("StartSimulation")]
        public IActionResult StartSimulation([FromBody] MyDataModel data)
        {
            SocketDataTransfer.ResetIteration();
            bool[][] boardData = JsonSerializer.Deserialize<bool[][]>(data.stringData);
            var numRows = boardData.Length;
            var numCols = boardData[0].Length;
            gameOfLifeBoard.CreateBoard(numRows, numCols);
            gameOfLifeBoard.SetBoards(boardData);
            gameOfLifeBoard.firstBoardHasCurrentData = true;
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