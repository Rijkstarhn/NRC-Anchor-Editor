using System.Collections;
using System.Collections.Generic;
using System.Xml.Linq;
using Anchor_Editor_Backend.Models;
namespace Anchor_Editor_Backend.Services
{
    public interface IXmlDeserializationService
    {
        public string TrimAnchorsOfXmlString(string originalXmlAsString, IList<Anchor> anchorList);
        public string GetPlainTextAsStringFromXml(XElement xmlFile);

        public IList<Anchor> GetAnchorsAsEnumerableFromXml(XElement xmlFile);
    }
}
