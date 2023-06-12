using System.Collections;

namespace CoreysGameOfLife.Models
{
    public class GameOfLifeBoard
    {
        private BitArray[] secondBoard;
        private BitArray[] firstBoard;
        public bool firstBoardHasCurrentData = true;
        private int width;
        private int height;

        public BitArray[] GetCurrentData()
        {
            return firstBoardHasCurrentData ? firstBoard : secondBoard;
        }

        public void CreateBoard(int height, int width)
        {
            firstBoard = new BitArray[height];
            secondBoard = new BitArray[height];
            for (int i = 0; i < height; i++)
            {
                firstBoard[i] = new BitArray(width);
                secondBoard[i] = new BitArray(width);
            }

            this.width = width;
            this.height = height;
        }

        public void GameLoop(BitArray[] current, BitArray[] holder)
        {
            for (int row = 0; row < height; row++)
            {
                for (int column = 0; column < width; column++)
                {
                    var numberOfLiveNeighbors = GetNumberOfLiveNeighbors(current, row, column);

                    if (numberOfLiveNeighbors < 2)
                    {
                        holder[row][column] = false;
                    }
                    else if (numberOfLiveNeighbors == 2)
                    {
                        if (current[row][column])
                        {
                            holder[row][column] = true;
                        }
                        else
                        {
                            holder[row][column] = false;
                        }
                    }
                    else if (numberOfLiveNeighbors == 3)
                    {
                        if (current[row][column])
                        {
                            holder[row][column] = true;
                        }
                        else
                        {
                            holder[row][column] = true;
                        }
                    }
                    else if (numberOfLiveNeighbors > 3)
                    {
                        holder[row][column] = false;
                    }
                }
            }
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

        }

        public int GetNumberOfLiveNeighbors(BitArray[] current, int row, int column)
        {
            var liveNeighbors = 0;

            liveNeighbors += CheckEast(current, row, column);
            liveNeighbors += CheckNorth(current, row, column);
            liveNeighbors += CheckSouth(current, row, column);
            liveNeighbors += CheckWest(current, row, column);
            liveNeighbors += CheckNorthEast(current, row, column);
            liveNeighbors += CheckSouthEast(current, row, column);
            liveNeighbors += CheckSouthWest(current, row, column);
            liveNeighbors += CheckNorthWest(current, row, column);

            return liveNeighbors;
        }

        public int CheckEast(BitArray[] current, int row, int column)
        {
            return IsOnRightEdge(row, column) ? 0 : current[row][column + 1] ? 1 : 0;
        }
        public int CheckNorth(BitArray[] current, int row, int column)
        {
            return IsOnTopEdge(row, column) ? 0 : current[row - 1][column] ? 1 : 0;
        }
        public int CheckSouth(BitArray[] current, int row, int column)
        {
            return IsOnBottomEdge(row, column) ? 0 : current[row + 1][column] ? 1 : 0;
        }
        public int CheckWest(BitArray[] current, int row, int column)
        {
            return IsOnLeftEdge(row, column) ? 0 : current[row][column - 1] ? 1 : 0;
        }
        public int CheckNorthEast(BitArray[] current, int row, int column)
        {
            if (IsOnTopEdge(row, column) || IsOnRightEdge(row, column))
            {
                return 0;
            }
            else
            {
                return current[row - 1][column + 1] ? 1 : 0;
            }
        }

        public int CheckSouthEast(BitArray[] current, int row, int column)
        {
            if (IsOnBottomEdge(row, column) || IsOnRightEdge(row, column))
            {
                return 0;
            }
            else
            {
                return current[row + 1][column + 1] ? 1 : 0;
            }
        }

        public int CheckSouthWest(BitArray[] current, int row, int column)
        {
            if (IsOnBottomEdge(row, column) || IsOnLeftEdge(row, column))
            {
                return 0;
            }
            else
            {
                return current[row + 1][column - 1] ? 1 : 0;
            }
        }

        public int CheckNorthWest(BitArray[] current, int row, int column)
        {
            if (IsOnTopEdge(row, column) || IsOnLeftEdge(row, column))
            {
                return 0;
            }
            else
            {
                return current[row - 1][column - 1] ? 1 : 0;
            }
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
            return column == width - 1;
        }
        public bool IsOnBottomEdge(int row, int column)
        {
            return row == height - 1;
        }

        public void SetBoards(bool[][] initialData)
        {
            for (int i = 0; i < height; i++)
            {
                for (int j = 0; j < width; j++)
                {
                    firstBoard[i][j] = initialData[i][j];
                }
            }
        }
    }
}
