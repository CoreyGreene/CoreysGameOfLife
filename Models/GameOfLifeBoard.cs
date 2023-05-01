using System.Collections;

namespace CoreysGameOfLife.Models
{
    public class GameOfLifeBoard
    {
        private BitArray[] secondBoard;
        private BitArray[] firstBoard;
        private bool firstBoardHasCurrentData = true;
        //private byte[] _board;
        private int width;
        private int height;

 
        public void CreateBoard(int width, int height)
        {
            // Init:
            secondBoard = new BitArray[20];
            firstBoard = new BitArray[20];
            for (int y = 0; y < firstBoard.Length; y++)
            {
                secondBoard[y] = new BitArray(20, false);
                firstBoard[y] = new BitArray(20, false);
            }

            for (int y = 0; y < secondBoard.Length; y++)
            {
                secondBoard[y] = new BitArray(20, false);
                firstBoard[y] = new BitArray(20, false);
            }

            // Usage:
         //   Boolean at5x7 = firstBoard[7][5];

            //_board = new byte[(width * height + 7) / 8];
            this.width = width;
            this.height = height;
        }

        public void GameLoop(BitArray[] current, BitArray[] holder)
        {
            for (int row = 0; row < 20; row++)
            {
                for (int column = 0; column < 20; column++)
                {
                   // var val  = current[i][j];
                    holder[row][column] = !current[row][column];// to to verify that something is happening
                }
            }
        }

        public int GetNumberOfLiveNeighbors(BitArray[] current, BitArray[] holder, int row , int column)
        {
            var liveNeighbors = 0;
            if (IsOnLeftEdge(row, column))
            {
                liveNeighbors += LeftEdgeProcessing(current, row, column);
            }


            return 0;
        }

        public int LeftEdgeProcessing(BitArray[] current, int row, int column)
        {
            var liveNeighbors = 0;
            if(IsOnTopEdge(row, column))
            {
                if (CheckEast(current, row, column))
                {
                    liveNeighbors++;
                }

                if (CheckSouth(current, row, column))
                {
                    liveNeighbors++;
                }

                if (CheckSouthEast(current, row, column))
                {
                    liveNeighbors++;
                }
            }
            else if (IsOnBottomEdge(row, column))
            {
                if (CheckEast(current, row, column))
                {
                    liveNeighbors++;
                }

                if (CheckNorth(current, row, column))
                {
                    liveNeighbors++;
                }

                if (CheckNorthEast(current, row, column))
                {
                    liveNeighbors++;
                }
            }
            else
            {

                if (CheckNorth(current, row, column))
                {
                    liveNeighbors++;
                }

                if (CheckNorthEast(current, row, column))
                {
                    liveNeighbors++;
                }

                if (CheckEast(current, row, column))
                {
                    liveNeighbors++;
                }

                if (CheckSouthEast(current, row, column))
                {
                    liveNeighbors++;
                }

                if (CheckSouth(current, row, column))
                {
                    liveNeighbors++;
                }
            }

            return liveNeighbors;
        }

        public bool CheckEast(BitArray[] current, int row, int column)
        {
            return current[row][column+1];
        }
        public bool CheckNorth(BitArray[] current, int row, int column)
        {
            return current[row - 1][column];
        }
        public bool CheckSouth(BitArray[] current, int row, int column)
        {
            return current[row +1][column];
        }
        public bool CheckNorthEast(BitArray[] current, int row, int column)
        {
            return current[row -1][column+1];
        }

        public bool CheckSouthEast(BitArray[] current, int row, int column)
        {
            return current[row + 1][column + 1];
        }

        public bool IsOnLeftEdge(int row, int column)
        {
            return column == 0;
        }
        public bool IsOnTopEdge(int row, int column)
        {
            return row == 0;
        }
        public bool IsOnRightEdge(int row, int column)
        {
            return column == 19;
        }
        public bool IsOnBottomEdge(int row, int column)
        {
            return row == 19;
        }


        public BitArray[] RunIteration()
        {
            /*
             * 
                Any live cell with fewer than two live neighbours dies, as if by underpopulation.
                Any live cell with two or three live neighbours lives on to the next generation.
                Any live cell with more than three live neighbours dies, as if by overpopulation.
                Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
             * 
             */

            if (firstBoardHasCurrentData)
            {
                GameLoop(firstBoard, secondBoard);
                firstBoardHasCurrentData = false;
                return secondBoard;
            }
            else
            {
                GameLoop(secondBoard, firstBoard);
                firstBoardHasCurrentData = true;
                return firstBoard;
            }

            for (int i =0; i < 20; i++)
            {
                for (int j = 0; j < 20; j++)
                {
                
                }
            }
        }

        public void SetBoards(int[][] initialData)
        {
             for(int i = 0; i < 20; i++)
            {
                for (int j = 0; j < 20; j++)
                {
                    firstBoard[i][j] = initialData[i][j] == 0 ? false : true;
                }
            }
        }

//
// public byte[] GetCurrentBoard()
// {
//     return _board;
// }
//
        //public bool GetCellState(int x, int y)
        //{
        //    int index = y * width + x;
        //    int byteIndex = index / 8;
        //    int bitIndex = index % 8;
        //    return (_board[byteIndex] & (1 << bitIndex)) != 0;
        //}
        //
        //public void SetCellState(int x, int y, bool state)
        //{
        //    int index = y * width + x;
        //    int byteIndex = index / 8;
        //    int bitIndex = index % 8;
        //    if (state)
        //    {
        //        _board[byteIndex] |= (byte)(1 << bitIndex);
        //    }
        //    else
        //    {
        //        _board[byteIndex] &= (byte)~(1 << bitIndex);
        //    }
        //}

       // public void PrintGrid()
       // {     
       //     for (int x = 0; x < width; x++)
       //     {
       //         for (int y = 0; y < height; y++)
       //         {
       //             bool cellState = GetCellState(x, y);
       //             Console.Write(cellState ? "1" : "0");
       //         }
       //     }
       // }
    }
}
