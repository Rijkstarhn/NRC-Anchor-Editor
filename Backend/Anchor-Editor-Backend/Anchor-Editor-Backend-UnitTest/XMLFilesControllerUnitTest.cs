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
    public class XMLFilesControllerUnitTest
    {
        public Mock<IXmlRepository> _xmlRepository;

        public Mock<IXmlDeserializationService> _xmlDeserializationService;

        public Mock<IXmlSerializationService> _xmlSerializationService;

        public Mock<IAnchorRepository> _anchorRepository;

        public XMLFilesController xMLFilesController;

        public XMLFilesControllerUnitTest()
        {
            _xmlRepository = new Mock<IXmlRepository>();
            _xmlDeserializationService = new Mock<IXmlDeserializationService>();
            _xmlSerializationService = new Mock<IXmlSerializationService>();
            _anchorRepository = new Mock<IAnchorRepository>();

            xMLFilesController = new XMLFilesController(_xmlSerializationService.Object, _anchorRepository.Object, _xmlRepository.Object, _xmlDeserializationService.Object);
        }

        [Fact]
        public void GetAllAnchorsUnitTest_Pass()
        {
            _xmlDeserializationService.Setup(x => x.GetAnchorsAsEnumerableFromXml(It.IsAny<XElement>())).Returns(new List<Anchor>());
            _xmlDeserializationService.Setup(x => x.TrimAnchorsOfXmlString(It.IsAny<string>(), It.IsAny<IList<Anchor>>())).Returns("<p> </p>");

            XElement xmlTree1 = new XElement("Root",
            new XElement("Child", 1),
            new XElement("Child", 2),
            new XElement("Child", 3),
            new XElement("Child", 4),
            new XElement("Child", 5),
            new XElement("Child", 6));

            var result = xMLFilesController.PostXMLFile(xmlTree1) as ObjectResult;
            Assert.Equal("XML Uploaded", result.Value);

        }

        [Fact]
        public void GetXmlFileUnitTest_Pass()
        {
            _xmlDeserializationService.Setup(x => x.GetAnchorsAsEnumerableFromXml(It.IsAny<XElement>())).Returns(new List<Anchor>());
            _xmlDeserializationService.Setup(x => x.TrimAnchorsOfXmlString(It.IsAny<string>(), It.IsAny<IList<Anchor>>())).Returns("<p> </p>");
            _xmlSerializationService.Setup(x => x.GetXmlFromAnchorsAndText(It.IsAny<string>(), It.IsAny<IList<Anchor>>(), It.IsAny<XElement>(), It.IsAny<Hashtable>())).Returns("hello");
            XElement xmlTree1 = new XElement("Root",
            new XElement("Child", 1),
            new XElement("Child", 2),
            new XElement("Child", 3),
            new XElement("Child", 4),
            new XElement("Child", 5),
            new XElement("Child", 6));

            var result = xMLFilesController.GetXmlFile() as ObjectResult;
            Assert.Equal("hello", result.Value);
        }

    }
}
