namespace CoreysGameOfLife.Models
{
    public class GameOfLifeBoard
    {
        private byte[] _board;
        private int width;
        private int height;

 
        public void CreateBoard(int width, int height)
        {
            _board = new byte[(width * height + 7) / 8];
            this.width = width;
            this.height = height;
        }

        public byte[] GetCurrentBoard()
        {
            return _board;
        }

        public bool GetCellState(int x, int y)
        {
            int index = y * width + x;
            int byteIndex = index / 8;
            int bitIndex = index % 8;
            return (_board[byteIndex] & (1 << bitIndex)) != 0;
        }

        public void SetCellState(int x, int y, bool state)
        {
            int index = y * width + x;
            int byteIndex = index / 8;
            int bitIndex = index % 8;
            if (state)
            {
                _board[byteIndex] |= (byte)(1 << bitIndex);
            }
            else
            {
                _board[byteIndex] &= (byte)~(1 << bitIndex);
            }
        }

        public void PrintGrid()
        {     
            for (int x = 0; x < width; x++)
            {
                for (int y = 0; y < height; y++)
                {
                    bool cellState = GetCellState(x, y);
                    Console.Write(cellState ? "1" : "0");
                }
            }
        }
    }
}
