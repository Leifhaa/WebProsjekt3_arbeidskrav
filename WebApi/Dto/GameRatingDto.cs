namespace WebApi.Dto
{
    /// <summary>
    /// A data transfer object for sending and recieving game rating specifics
    /// </summary>
    public class GameRatingDto
    {
        /// <summary>
        /// Rating given by the customer
        /// </summary>
        public int Rating { get; set; }
        /// <summary>
        /// Number of customers which has given a rating
        /// </summary>
        /// 
        public double RatingCounter { get; set; }
    }
}