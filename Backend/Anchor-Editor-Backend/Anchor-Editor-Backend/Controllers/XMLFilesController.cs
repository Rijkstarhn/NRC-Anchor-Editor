using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;
using System.Net.Http;
using System.Xml;
using System.Xml.Linq;
using System.Collections;
using Anchor_Editor_Backend.Repository;
using Anchor_Editor_Backend.Services;
using Anchor_Editor_Backend.Models;
using System.Text;
using Microsoft.AspNetCore.Cors;

namespace Anchor_Editor_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class XMLFilesController : ControllerBase
    {
        private IXmlRepository _xmlRepository;

        private IXmlDeserializationService _xmlDeserializationService;

        private IXmlSerializationService _xmlSerializationService;

        private IAnchorRepository _anchorRepository;

        public XMLFilesController(IXmlSerializationService xmlSerializationService, IAnchorRepository anchorRepository, IXmlRepository xmlRepository, IXmlDeserializationService xmlDeserializationService)
        {
            _anchorRepository = anchorRepository;
            _xmlRepository = xmlRepository;
            _xmlDeserializationService = xmlDeserializationService;
            _xmlSerializationService = xmlSerializationService;
        }

        [EnableCors("AllowOrigin")]
        [HttpPost]
        public IActionResult PostXMLFile([FromBody] XElement request)
        {
            try
            {
                XmlDocument originalXmlDocument = new XmlDocument();
                var originalXmlAsString = request.ToString();
                originalXmlDocument.LoadXml(originalXmlAsString);

                IList<Anchor> anchorList = _xmlDeserializationService.GetAnchorsAsEnumerableFromXml(request);
                _anchorRepository.AnchorList = anchorList;



                string trimmedXmlString = _xmlDeserializationService.TrimAnchorsOfXmlString(originalXmlDocument.InnerXml, anchorList);

                XElement xmlTree = XElement.Parse(trimmedXmlString);

                _xmlRepository.uploadXMLFile(xmlTree);

                return Ok("XML Uploaded");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }

        [EnableCors("AllowOrigin")]
        [HttpGet]
        public IActionResult GetXmlFile()
        {
            try
            {
                var originalXmlFile = _xmlRepository.OriginalXmlFile;
                string plainText = _xmlDeserializationService.GetPlainTextAsStringFromXml(originalXmlFile);
                IList<Anchor> anchorList = _anchorRepository.AnchorList;

                Hashtable nastedAnchors = _anchorRepository.NestedAnchorsByLocation();

                string updatedXml = _xmlSerializationService.GetXmlFromAnchorsAndText(plainText, anchorList, originalXmlFile, nastedAnchors);

                return Ok(updatedXml);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        
    }
}
