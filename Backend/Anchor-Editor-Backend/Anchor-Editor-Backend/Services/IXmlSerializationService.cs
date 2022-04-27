using System.Collections.Generic;
using System.Xml;
using System.Xml.Linq;
using Anchor_Editor_Backend.Models;
using System.Collections;

namespace Anchor_Editor_Backend.Services
{
    public interface IXmlSerializationService
    {
        string GetXmlFromAnchorsAndText(string plainText, IList<Anchor> anchorList, XElement originalXmlFile, Hashtable nastedAnchors);
    }
}
