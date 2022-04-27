using System.Xml.Linq;

namespace Anchor_Editor_Backend.Repository
{
    public interface IXmlRepository
    {
        XElement OriginalXmlFile { get; set; }

        void uploadXMLFile(XElement xmlFile);
    }
}
