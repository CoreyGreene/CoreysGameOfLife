namespace CoreysGameOfLife.WebSocket
{
    public class CancelEventSingleton
    {
        private static CancelEventSingleton instance;
        private static readonly object lockObject = new object();
        private bool cancelIteration = false;

        public static CancelEventSingleton GetInstance()
        {
            if (instance == null)
            {
                lock (lockObject)
                {
                    instance ??= new CancelEventSingleton();
                }
            }

            return instance;
        }

        public void ResetIteration()
        {
            cancelIteration = false;
        }

        public void CancelIteration()
        {
            cancelIteration = true;
        }

        public bool ShouldCancelIternation()
        {
            return cancelIteration;
        }
    }
}