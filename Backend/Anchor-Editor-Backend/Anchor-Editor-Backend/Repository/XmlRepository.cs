using System.Xml.Linq;

namespace Anchor_Editor_Backend.Repository
{
    public class XmlRepository : IXmlRepository
    {
        public XElement OriginalXmlFile { get; set; }

        public void uploadXMLFile(XElement xmlFile)
        {
            OriginalXmlFile = xmlFile;
        }
    }
}
