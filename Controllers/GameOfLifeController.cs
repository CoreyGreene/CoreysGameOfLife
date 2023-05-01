using CoreysGameOfLife.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System.Text.Json;

namespace CoreysGameOfLife.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GameOfLifeController : ControllerBase
    {
        private readonly ILogger<GameOfLifeController> _logger;
        private readonly GameOfLifeBoard _gameOfLifeBoard;

        public GameOfLifeController(ILogger<GameOfLifeController> logger, GameOfLifeBoard gameOfLifeBoard)
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


            //for (int i = 0; i < numRows; i++)
            //{
            //    for (int j = 0; j < numCols; j++)
            //    {
            //        var val = boardData[i][j];
            //        _gameOfLifeBoard.SetCellState(i, j, val == 0 ? false : true);
            //    }
            //}

            //gameOfLifeBoard.PrintGrid();
            return Ok();
        }
    }
}