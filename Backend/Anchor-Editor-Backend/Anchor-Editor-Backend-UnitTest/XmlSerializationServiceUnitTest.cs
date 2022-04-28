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
using System.Collections;

namespace Anchor_Editor_Backend_UnitTest
{
    public class XmlSerializationServiceUnitTest
    {
        public IXmlSerializationService _xmlSerializationService;

        public XElement _xElement;

        public IList<Anchor> _anchorList;

        public string _plainText;

        public Hashtable _nestedAnchors;

        public XmlSerializationServiceUnitTest()
        {
            _xmlSerializationService = new XmlSerializationService();

            Anchor anchor1 = new Anchor("1.62s", 9);
            Anchor anchor2 = new Anchor("3.81", 55);
            Anchor anchor3 = new Anchor("3.82", 55);

            _anchorList = new List<Anchor>();


            _plainText = "Bonjour.";

            //Insert these anchors to an xml files.
            //Two or more anchors can be in the same location
            _nestedAnchors = new Hashtable() {
                {0, "<anchor time=\"0s\" />"}, {0, "<anchor time=\"1.0s\" />"}, {9, "<anchor time=\"1.62s\" />"}, {55, "<anchor time=\"3.81s\" /><anchor time=\"3.82s\" />"}
            };


            _xElement = XElement.Parse("<?xml version='1.0' encoding='utf-8'?><TEI>" +
                "<!-- To exclude any element from alignment, add the do-not-align=\"true\" attribute to" +
                "it, e.g., <p do-not-align=\"true\">...</p>, or" +
                "<s>Some text <foo do-not-align=\"true\">do not align this</foo> more text</s> -->" +
                "<text xml:lang=\"fra\">" +
                "<body>" +
                "<div type=\"page\">" +
                "<p>" +
                "<s>Bonjour.</s>" +
                "<s>Je m&#x27;appelle Éric Joanis.</s>" +
                "<s>Je suis programmeur   au sein de l&#x27;équipe des technologies pour les langues autochtones au CNRC.</s>" +
                "</p>" +
                "</div>" +
                "<div type=\"page\">" +
                "<p>" +
                "<s>J&#x27;ai fait une bonne partie de ma carrière en traduction automatique statistique, mais maintenant cette approche est déclassée par l&#x27;apprentissage profond.</s>" +
                "<s>En ce moment je travaille à l&#x27;alignement du hansard du Nunavut pour produire un corpus bilingue anglais-inuktitut.</s>" +
                "<s>Ce corpus permettra d&#x27;entraîner la TA, neuronale ou statistique, ainsi que d&#x27;autres applications de traitement du langage naturel.</s>" +
                "</p>" +
                "<p>" +
                "<s>En parallèle, j&#x27;aide à écrire des tests pour rendre le ReadAlong-Studio plus robuste.</s>" +
                "</p>" +
                "</div>" +
                "</body>" +
                "</text></TEI>");
        }

        [Fact]
        public void GetXmlFromAnchorsAndText_Pass()
        {
            var result = _xmlSerializationService.GetXmlFromAnchorsAndText(_plainText, _anchorList, _xElement, _nestedAnchors);
            string validation = "<TEI>\r\n  <!-- To exclude any element from alignment, add the do-not-align=\"true\" attribute toit, e.g., <p do-not-align=\"true\">...</p>, or<s>Some text <foo do-not-align=\"true\">do not align this</foo> more text</s> -->\r\n  <text xml:lang=\"fra\">\r\n    \n <body> \n<div type=\"page\"><p><s><anchor time=\"0s\" />Bonjour.</s><s><anchor time=\"1.62s\" />Je m'appelle Éric Joanis.</s><s>Je suis programmeur <anchor time=\"3.81s\" /><anchor time=\"3.82s\" />  au sein de l'équipe des technologies pour les langues autochtones au CNRC.</s></p></div><div type=\"page\"><p><s>J'ai fait une bonne partie de ma carrière en traduction automatique statistique, mais maintenant cette approche est déclassée par l'apprentissage profond.</s><s>En ce moment je travaille à l'alignement du hansard du Nunavut pour produire un corpus bilingue anglais-inuktitut.</s><s>Ce corpus permettra d'entraîner la TA, neuronale ou statistique, ainsi que d'autres applications de traitement du langage naturel.</s></p><p><s>En parallèle, j'aide à écrire des tests pour rendre le ReadAlong-Studio plus robuste.</s></p></div>\n</body>\n\r\n  </text>\r\n</TEI>";
            Assert.Equal(validation, result);

        }



    }
}
