//Details of setting up the database
namespace WebApi.Models{
    public interface IWebApiDatabaseSettings{
        //Name of game collection we want to access
        string GamesCollectionName {get; set;}
        /// <summary>
        /// Name of the comments collection
        /// </summary>
        public string CommentsCollectionName { get; set; }
        /// <summary>
        /// Name of the characters collection
        /// </summary>
        public string CharactersCollectionName { get; set; }

        //Connection string (URL) to the mongoDb
        string ConnectionString {get;set;}
        //Name of the database in mongodb.
        string DatabaseName{ get; set;}
    }

    public class WebApiDatabaseSettings : IWebApiDatabaseSettings {
        public string GamesCollectionName { get; set;}
        public string CommentsCollectionName { get; set; }
        public string CharactersCollectionName { get; set; }
        public string ConnectionString{ get; set;}
        public string DatabaseName{ get; set;}
    }
}