using System;
using Xunit;
using Anchor_Editor_Backend.Controllers;
using Anchor_Editor_Backend.Repository;
using Anchor_Editor_Backend.Services;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;
using Anchor_Editor_Backend.Repository;
using Anchor_Editor_Backend.Services;
using Anchor_Editor_Backend.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Anchor_Editor_Backend_UnitTest
{
    public class PlainTextControllerUnitTest
    {
        public Mock<IXmlRepository> _xmlRepository;
        public Mock<IXmlDeserializationService> _xmlDeserializationService;
        public PlainTextController _plainTextController;

        public PlainTextControllerUnitTest()
        {
            _xmlRepository = new Mock<IXmlRepository>();
            _xmlDeserializationService = new Mock<IXmlDeserializationService>();
            _plainTextController = new PlainTextController(_xmlRepository.Object, _xmlDeserializationService.Object);
        }

        [Fact]
        public void GetAllAnchorsUnitTest_Pass()
        {
            _xmlDeserializationService.Setup(m => m.GetPlainTextAsStringFromXml(It.IsAny<System.Xml.Linq.XElement>())).Returns("Bonjour");
            var result = _plainTextController.GetPlainTextAsString() as ObjectResult;
            Assert.Equal("Bonjour", result.Value);
        }
    }
}
