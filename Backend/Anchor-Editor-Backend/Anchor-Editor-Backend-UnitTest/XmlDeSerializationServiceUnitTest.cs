using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using Anchor_Editor_Backend.Controllers;
using Anchor_Editor_Backend.Repository;
using Anchor_Editor_Backend.Services;
using Moq;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Anchor_Editor_Backend.Models;
using System.Xml.Linq;

namespace Anchor_Editor_Backend_UnitTest
{
    public class XmlDeSerializationServiceUnitTest
    {
        public IXmlDeserializationService _xmlDeserializationService;

        public XElement _xElement;

        public IList<Anchor> _anchorList;

        public string xmlString;

        public XmlDeSerializationServiceUnitTest()
        {
            _xmlDeserializationService = new XmlDeserializationService();

            _xElement = XElement.Parse("<TEI >\r\n <!--To exclude any element from alignment, add the do -not - align =\"true\" attribute toit, e.g., <p do-not-align=\"true\">...</p>, or<s>Some text <foo do-not-align=\"true\">do not align this</foo> more text</s> -->\r\n  <text xml:lang=\"fra\">\r\n    \n <body> \n<div type=\"page\"><p><s><anchor time=\"0s\" />Bonjour.</s><s><anchor time=\"1.62s\" />Je m'appelle Éric Joanis.</s><s>Je suis programmeur <anchor time=\"3.81s\" /><anchor time=\"3.82s\" />  au sein de l'équipe des technologies pour les langues autochtones au CNRC.</s></p></div><div type=\"page\"><p><s>J'ai fait une bonne partie de ma carrière en traduction automatique statistique, mais maintenant cette approche est déclassée par l'apprentissage profond.</s><s>En ce moment je travaille à l'alignement du hansard du Nunavut pour produire un corpus bilingue anglais-inuktitut.</s><s>Ce corpus permettra d'entraîner la TA, neuronale ou statistique, ainsi que d'autres applications de traitement du langage naturel.</s></p><p><s>En parallèle, j'aide à écrire des tests pour rendre le ReadAlong-Studio plus robuste.</s></p></div>\n</body>\n\r\n  </text>\r\n</TEI>");

            xmlString = "<TEI >\r\n <!--To exclude any element from alignment, add the do -not - align =\"true\" attribute toit, e.g., <p do-not-align=\"true\">...</p>, or<s>Some text <foo do-not-align=\"true\">do not align this</foo> more text</s> -->\r\n  <text xml:lang=\"fra\">\r\n    \n <body> \n<div type=\"page\"><p><s><anchor time=\"0s\" />Bonjour.</s><s><anchor time=\"1.62s\" />Je m'appelle Éric Joanis.</s><s>Je suis programmeur <anchor time=\"3.81s\" /><anchor time=\"3.82s\" />  au sein de l'équipe des technologies pour les langues autochtones au CNRC.</s></p></div><div type=\"page\"><p><s>J'ai fait une bonne partie de ma carrière en traduction automatique statistique, mais maintenant cette approche est déclassée par l'apprentissage profond.</s><s>En ce moment je travaille à l'alignement du hansard du Nunavut pour produire un corpus bilingue anglais-inuktitut.</s><s>Ce corpus permettra d'entraîner la TA, neuronale ou statistique, ainsi que d'autres applications de traitement du langage naturel.</s></p><p><s>En parallèle, j'aide à écrire des tests pour rendre le ReadAlong-Studio plus robuste.</s></p></div>\n</body>\n\r\n  </text>\r\n</TEI>";

            Anchor anchor0 = new Anchor("0s", 0);
            Anchor anchor1 = new Anchor("1.62s", 9);
            Anchor anchor2 = new Anchor("3.81s", 55);
            Anchor anchor3 = new Anchor("3.82s", 55);

            _anchorList = new List<Anchor>() { 
                anchor0,
                anchor1,
                anchor2,
                anchor3
            };

        }

        [Fact]
        public void GetXmlFromAnchorsAndText_Pass()//Trim all anchors defined in the anchor list
        {
            var result = _xmlDeserializationService.TrimAnchorsOfXmlString(xmlString, _anchorList);
            string validation = "<TEI >\r\n <!--To exclude any element from alignment, add the do -not - align =\"true\" attribute toit, e.g., <p do-not-align=\"true\">...</p>, or<s>Some text <foo do-not-align=\"true\">do not align this</foo> more text</s> -->\r\n  <text xml:lang=\"fra\">\r\n    \n <body> \n<div type=\"page\"><p><s>Bonjour.</s><s>Je m'appelle Éric Joanis.</s><s>Je suis programmeur   au sein de l'équipe des technologies pour les langues autochtones au CNRC.</s></p></div><div type=\"page\"><p><s>J'ai fait une bonne partie de ma carrière en traduction automatique statistique, mais maintenant cette approche est déclassée par l'apprentissage profond.</s><s>En ce moment je travaille à l'alignement du hansard du Nunavut pour produire un corpus bilingue anglais-inuktitut.</s><s>Ce corpus permettra d'entraîner la TA, neuronale ou statistique, ainsi que d'autres applications de traitement du langage naturel.</s></p><p><s>En parallèle, j'aide à écrire des tests pour rendre le ReadAlong-Studio plus robuste.</s></p></div>\n</body>\n\r\n  </text>\r\n</TEI>";
            Assert.Equal(validation, result);
        }

        [Fact]
        public void GetPlainTextAsStringFromXml_Pass()
        {
            var result = _xmlDeserializationService.GetPlainTextAsStringFromXml(_xElement);
            string validation = "Bonjour.\nJe m'appelle Éric Joanis.\nJe suis programmeur   au sein de l'équipe des technologies pour les langues autochtones au CNRC.\n\n\nJ'ai fait une bonne partie de ma carrière en traduction automatique statistique, mais maintenant cette approche est déclassée par l'apprentissage profond.\nEn ce moment je travaille à l'alignement du hansard du Nunavut pour produire un corpus bilingue anglais-inuktitut.\nCe corpus permettra d'entraîner la TA, neuronale ou statistique, ainsi que d'autres applications de traitement du langage naturel.\n\n\nEn parallèle, j'aide à écrire des tests pour rendre le ReadAlong-Studio plus robuste.\n\n\n";
            Assert.Equal(validation, result);
        }

        [Fact]
        public void GetAnchorsAsEnumerableFromXml_Pass()
        {
            var result = _xmlDeserializationService.GetAnchorsAsEnumerableFromXml(_xElement);

            Assert.Equal(4, result.Count);
            Assert.Equal("<anchor time=\"0s\" />", result[0].ToString());
        }
    }
}
