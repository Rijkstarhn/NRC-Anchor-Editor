using System;
using Microsoft.AspNetCore.Mvc;
using Anchor_Editor_Backend.Repository;
using Anchor_Editor_Backend.Services;
using Microsoft.AspNetCore.Cors;

namespace Anchor_Editor_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlainTextController : ControllerBase
    {
        private IXmlRepository _xmlRepository;

        private IXmlDeserializationService _xmlDeserializationService;

        public PlainTextController(IXmlRepository xmlRepository, IXmlDeserializationService xmlDeserializationService)
        {
            _xmlRepository = xmlRepository;
            _xmlDeserializationService = xmlDeserializationService;
        }

        [EnableCors("AllowOrigin")]
        [HttpGet]
        public IActionResult GetPlainTextAsString()
        {
            try
            {
                var originalXmlFile = _xmlRepository.OriginalXmlFile;
                string plainText = _xmlDeserializationService.GetPlainTextAsStringFromXml(originalXmlFile);
                string str = plainText;
                return Ok(str);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
