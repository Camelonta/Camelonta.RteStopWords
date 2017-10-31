# Camelonta.RteStopWords
When typing in RTE configured stop words are being highlighted

Stopwords fetched from Umbraco Back office
While using this stopword funtionality ensure that there is method GetStopwords in the path Core/Controllers/PartialSurfaceController 
If there is no PartialSurfaceController and the method given below, create it in the path Core/Controllers.
 
namespace ProjectName.Core.Controllers
{
    public class PartialSurfaceController : SurfaceController 
	{     
 		[HttpGet]
        	public JsonResult GetStopwords()
        		{
            			var currentSite = Umbraco.TypedContentAtRoot().FirstOrDefault();
            			var stopwords = currentSite.GetPropertyValue<string[]>("stopwords");
            			stopwords = stopwords.Where(s => !string.IsNullOrEmpty(s.Trim())).ToArray();
            			return Json(stopwords, JsonRequestBehavior.AllowGet);
        		}
	}	
}