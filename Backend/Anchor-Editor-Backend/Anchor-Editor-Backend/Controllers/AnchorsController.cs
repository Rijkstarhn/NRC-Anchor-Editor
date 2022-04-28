using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;
using Anchor_Editor_Backend.Services;
using Anchor_Editor_Backend.Repository;
using Anchor_Editor_Backend.Models;
using Microsoft.AspNetCore.Cors;

namespace Anchor_Editor_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnchorsController : ControllerBase
    {
        private IXmlRepository _xmlRepository;
        private IAnchorRepository _anchorRepository;
        private IXmlDeserializationService _xmlDeserializationService;

        public AnchorsController(IAnchorRepository anchorRepository, IXmlRepository xmlRepository, IXmlDeserializationService xmlDeserializationService)
        {
            _anchorRepository = anchorRepository;
            _xmlRepository = xmlRepository;
            _xmlDeserializationService = xmlDeserializationService;
        }

        [EnableCors("AllowOrigin")]
        [HttpGet]
        public IActionResult GetAllAnchors()
        {
            return Ok(_anchorRepository.AnchorList);
        }

        [EnableCors("AllowOrigin")]
        [HttpGet("{timestamp}")]
        public IActionResult GetAnchorsByTimestamp(string timestamp)
        {
            if(string.IsNullOrEmpty(timestamp))
            {
                return BadRequest("timestamp not valid");
            }
            try
            {
                Anchor anchor = _anchorRepository.GetAnchorByTimestamp(timestamp);
                return Ok(anchor);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [EnableCors("AllowOrigin")]
        [HttpGet("{location:int}")]
        public IActionResult GetAnchorsByLocation(int location)
        {
            if (location < 0)
            {
                return BadRequest("location not valid");
            }
            try
            {
                IList<Anchor> anchors = _anchorRepository.GetAnchorsByLocation(location);
                return Ok(anchors);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [EnableCors("AllowOrigin")]
        [HttpDelete("{timestamp}")]
        public IActionResult DeleteAnchorByTimestamp(string timestamp)
        {
            if (string.IsNullOrEmpty(timestamp))
            {
                return BadRequest("timestamp not valid");
            }
            try
            {
                _anchorRepository.DeleteAnchorByTimestamp(timestamp);
                return Ok(_anchorRepository.AnchorList);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [EnableCors("AllowOrigin")]
        [HttpPost]
        public IActionResult AddAnchorByTimestamp([FromQuery] string destinationTimestamp, [FromQuery] int destinationLocation)
        {
            if (string.IsNullOrEmpty(destinationTimestamp))
            {
                return BadRequest("destinationTimestamp not valid");
            }
            try
            {
                _anchorRepository.AddAnchorByTimestamp(destinationTimestamp, destinationLocation);
                return Ok(_anchorRepository.AnchorList);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [EnableCors("AllowOrigin")]
        [HttpPut]
        public IActionResult EditAnchor([FromQuery] string originalTimestamp, [FromQuery] int originalLocation, [FromQuery] string destinationTimestamp, [FromQuery] int destinationLocation)
        {
            if (string.IsNullOrEmpty(originalTimestamp))
            {
                return BadRequest("originalTimestamp not valid");
            }
            try
            {
                _anchorRepository.EditAnchor(originalTimestamp, originalLocation, destinationTimestamp, destinationLocation);
                return Ok(_anchorRepository.AnchorList);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
