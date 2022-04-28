using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;
using System.Net.Http;
using System.Xml;
using System.Xml.Linq;
using Anchor_Editor_Backend.Repository;
using Anchor_Editor_Backend.Models;
using System.Collections.Generic;
using System;
using System.Linq;
using System.Collections;

namespace Anchor_Editor_Backend.Services
{
    public class XmlDeserializationService : IXmlDeserializationService
    {
        public string TrimAnchorsOfXmlString(string originalXmlAsString, IList<Anchor> anchorList)
        {
            int count = 0;
            while (count < originalXmlAsString.Length)
            {
                if (originalXmlAsString[count] == '<')
                {
                    foreach (var anchor in anchorList)
                    {
                        string anchorString = anchor.ToString();
                        if (count + anchorString.Length < originalXmlAsString.Length && originalXmlAsString.Substring(count, anchorString.Length) == anchorString)
                        {
                            originalXmlAsString = originalXmlAsString.Remove(count, anchorString.Length);
                        }
                    }
                }

                count++;
            }
            return originalXmlAsString;
        }

        public string GetPlainTextAsStringFromXml(XElement xmlFile)
        {
            string plainText = "";

            XmlDocument originalXmlDocument = new XmlDocument();
            var originalXmlAsString = xmlFile.ToString();
            originalXmlDocument.LoadXml(originalXmlAsString);

            XmlNodeList paragraphList = originalXmlDocument.DocumentElement.GetElementsByTagName("p");

            foreach (XmlNode paragraphNode in paragraphList)
            {
                XmlDocument sentencesXml = new XmlDocument();
                sentencesXml.LoadXml("<paragraphRoot>" + paragraphNode.InnerXml + "</paragraphRoot>");
                XmlNodeList sentenceList = sentencesXml.DocumentElement.GetElementsByTagName("s");

                foreach (XmlNode sentenceNode in sentenceList)
                {
                    string sentence = sentenceNode.InnerText;
                    plainText = plainText + sentence + "\n";
                }

                plainText = plainText + "\n\n";
            }

            return plainText;
        }

        public IList<Anchor> GetAnchorsAsEnumerableFromXml(XElement xmlFile)
        {
            IList<Anchor> result = new List<Anchor>();

            IList<string> anchorsTimeList = new List<string>();

            IList<int> anchorsPositionList = new List<int>();

            XmlDocument originalXmlDocument = new XmlDocument();
            var originalXmlAsString = xmlFile.ToString();
            originalXmlDocument.LoadXml(originalXmlAsString);

            XmlNodeList anchorsList = originalXmlDocument.DocumentElement.GetElementsByTagName("anchor");

            foreach (XmlNode anchorNode in anchorsList)
            {
                string anchorTime = anchorNode.Attributes["time"].Value;
                anchorsTimeList.Add(anchorTime);
            }

            XmlNodeList paragraphList = originalXmlDocument.DocumentElement.GetElementsByTagName("text");

            int positionPointer = 0;

            foreach (XmlNode paragraphNode in paragraphList)
            {
                string paragraph = paragraphNode.InnerXml;
                bool inXmlTag = true;
                string originalText = GetPlainTextAsStringFromXml(xmlFile);
                for (int counter = 0; counter < paragraph.Length; counter++)//iterate over a paragraph
                {
                    char c = paragraph[counter];

                    if (c == '<')
                    {
                        inXmlTag = false;
                        if (counter + 6 < paragraph.Length && paragraph.Substring(counter, 7) == "<anchor")
                        {
                            anchorsPositionList.Add(positionPointer);
                            //Console.WriteLine($"Get Anchor at {positionPointer} + {originalText[positionPointer]}");
                        }
                        continue;
                    }
                    else if (c == '>')
                    {
                        inXmlTag = true;
                        if (counter - 3 >= 0 && paragraph.Substring(counter - 3, 4) == "</s>")
                        {
                            positionPointer += 1;
                        }

                        else if(counter - 3 >= 0 && paragraph.Substring(counter - 3, 4) == "</p>")
                        {
                            positionPointer += 1;
                            positionPointer += 1;
                        }
                        continue;
                    }
                    
                    if (inXmlTag)
                    {
                        //Console.WriteLine($"{positionPointer} + {paragraph[counter]}");
                        positionPointer++;
                    }
                }
            }

            if (anchorsTimeList.Count != anchorsPositionList.Count)
            {
                throw new Exception("Backend Bug! Anchor time and Anchor position count does not match");
            }

            for (int i = 0; i < anchorsPositionList.Count; i++)
            {
                Anchor anchor = new Anchor(anchorsTimeList[i], anchorsPositionList[i]);
                result.Add(anchor);
            }

            return result;
        }
    }
}