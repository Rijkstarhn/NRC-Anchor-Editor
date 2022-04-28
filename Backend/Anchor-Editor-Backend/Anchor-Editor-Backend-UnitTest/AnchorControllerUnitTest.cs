using System;
using Xunit;
using Anchor_Editor_Backend.Controllers;
using Anchor_Editor_Backend.Repository;
using Anchor_Editor_Backend.Services;
using Moq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Anchor_Editor_Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Anchor_Editor_Backend_UnitTest
{
    public class AnchorControllerUnitTest
    {
        public Mock<IXmlRepository> _xmlRepository;
        public Mock<IAnchorRepository> _anchorRepository;
        public Mock<IXmlDeserializationService> _xmlDeserializationService;

        public Anchor anchor1;
        public Anchor anchor2;
        public Anchor anchor3;
        public IList<Anchor> anchorList;

        public AnchorsController anchorsController { get; set; }

        public AnchorControllerUnitTest()
        {
            _xmlRepository = new Mock<IXmlRepository>();
            _anchorRepository = new Mock<IAnchorRepository>();
            _xmlDeserializationService = new Mock<IXmlDeserializationService>();

            

            anchorsController = new AnchorsController(_anchorRepository.Object, _xmlRepository.Object, _xmlDeserializationService.Object);

            anchor1 = new Anchor("1s", 1);
            anchor2 = new Anchor("2s", 2);
            anchor3 = new Anchor("3s", 3);

            anchorList = new List<Anchor>()
            {
                anchor1,
                anchor2,
                anchor3
            };
        }

        [Fact]
        public void GetAllAnchorsUnitTest_Pass()
        {
            _anchorRepository.Setup(m => m.AnchorList).Returns(anchorList);

            var result = anchorsController.GetAllAnchors() as ObjectResult;
            Assert.Equal(anchorList, result.Value);
        }

        [Fact]
        public void GetAnchorsByTimestamp_Pass()
        {
            _anchorRepository.Setup(m => m.GetAnchorByTimestamp(It.IsAny<string>())).Returns(anchor1);

            var result = anchorsController.GetAnchorsByTimestamp("1s") as ObjectResult;

            Assert.Equal(anchor1, result.Value);
        }

        [Fact]
        public void GetAnchorsByLocation_Pass()
        {
            _anchorRepository.Setup(m => m.GetAnchorsByLocation(It.IsAny<int>())).Returns(anchorList);

            var result = anchorsController.GetAnchorsByLocation(1) as ObjectResult;

            Assert.Equal(anchorList, result.Value);
        }

        [Fact]
        public void DeleteAnchorByTimestamp_Pass()
        {
            _anchorRepository.Setup(m => m.AnchorList).Returns(anchorList);

            var result = anchorsController.DeleteAnchorByTimestamp("1s") as ObjectResult;
            Assert.Equal(anchorList, result.Value);
        }

        [Fact]
        public void AddAnchorByTimestamp_Pass()
        {
            _anchorRepository.Setup(m => m.AnchorList).Returns(anchorList);

            var result = anchorsController.AddAnchorByTimestamp("1s", 1) as ObjectResult;
            Assert.Equal(anchorList, result.Value);
        }

        [Fact]
        public void EditAnchor_Pass()
        {
            _anchorRepository.Setup(m => m.AnchorList).Returns(anchorList);

            var result = anchorsController.EditAnchor("1s", 1, "2s", 2) as ObjectResult;
            Assert.Equal(anchorList, result.Value);
        }


    }
}
