using Anchor_Editor_Backend.Models;
using System.Collections.Generic;
using System.Xml;
using System.Xml.Linq;
using System;
using System.Collections;

namespace Anchor_Editor_Backend.Services
{
    public class XmlSerializationService : IXmlSerializationService
    {
        public string GetXmlFromAnchorsAndText(string plainText, IList<Anchor> anchorList, XElement originalXmlFile, Hashtable nastedAnchors)
        {
            XmlDocument originalXmlDocument = new XmlDocument();
            var originalXmlAsString = originalXmlFile.ToString();
            originalXmlDocument.LoadXml(originalXmlAsString);

            XmlNodeList paragraphList = originalXmlDocument.DocumentElement.GetElementsByTagName("body");

            string trimmedXmlAsString = paragraphList[0].InnerXml;
            
            string updatedBoduXmlAsString = InstertAnchors(trimmedXmlAsString, nastedAnchors);

            string originalHead = originalXmlAsString.Split("<body>")[0] + "\n <body> \n";

            string tail = "\n"  + @"</body>" + "\n" + originalXmlAsString.Split("</body>")[1];

            return originalHead + updatedBoduXmlAsString + tail;
        }

        private string InstertAnchors(string trimmedXmlAsString, Hashtable nestedAnchors)
        {
            XmlDocument originalXmlDocument = new XmlDocument();
            trimmedXmlAsString = "<para><body> " + trimmedXmlAsString + "</body></para>";
            originalXmlDocument.LoadXml(trimmedXmlAsString);

            XmlNodeList paragraphList = originalXmlDocument.DocumentElement.GetElementsByTagName("body");

            int positionPointer = 0;

            string res = "";
/*            foreach (XmlNode paragraphNode in paragraphList)
            {*/
                
            string paragraph = paragraphList[0].InnerXml;
            bool inXmlTag = true;

            int counter = 0;
            while (counter < paragraph.Length)
            {
                char c = paragraph[counter];

                if (c == '<')
                {
                    inXmlTag = false;
                    counter += 1;
                    continue;
                }
                else if (c == '>')
                {
                    inXmlTag = true;
                    if (counter - 3 >= 0 && paragraph.Substring(counter - 3, 4) == "</s>")
                    {
                        if (nestedAnchors.ContainsKey(positionPointer))
                        {
                            paragraph = paragraph.Insert(counter, (string)nestedAnchors[positionPointer]);
                            counter += ((string)nestedAnchors[positionPointer]).Length;
                        }
                        //Console.WriteLine($"{positionPointer} + \n");
                        res += "\n";
                        positionPointer += 1;
                            
                    }

                    else if (counter - 3 >= 0 && paragraph.Substring(counter - 3, 4) == "</p>")
                    {
                        if (nestedAnchors.ContainsKey(positionPointer))
                        {
                            paragraph = paragraph.Insert(counter, (string)nestedAnchors[positionPointer]);
                            counter += ((string)nestedAnchors[positionPointer]).Length;
                        }
                        /*                        if (anchorPointer < anchorList.Count && positionPointer == anchorList[anchorPointer].Location)
                                                {
                                                    shift += anchorList[anchorPointer].ToString().Length;
                                                    paragraph = paragraph.Insert(counter, anchorList[anchorPointer].ToString());
                                                    counter += anchorList[anchorPointer].ToString().Length;
                                                    anchorPointer += 1;
                                                }*/
                        //Console.WriteLine($"{positionPointer} + \n");
                        res += "\n";
                        positionPointer += 1;

                        if (nestedAnchors.ContainsKey(positionPointer))
                        {
                            paragraph = paragraph.Insert(counter, (string)nestedAnchors[positionPointer]);
                            counter += ((string)nestedAnchors[positionPointer]).Length;
                        }
                        //Console.WriteLine($"{positionPointer} + \n");
                        res += "\n";
                        positionPointer += 1;

                    }
                    counter += 1;
                    continue;
                }

                if (inXmlTag)
                {
                    if (nestedAnchors.ContainsKey(positionPointer))
                    {
                        paragraph = paragraph.Insert(counter, (string)nestedAnchors[positionPointer]);
                        counter += ((string)nestedAnchors[positionPointer]).Length;
                    }
                    //Console.WriteLine($"{positionPointer} + \n");
                    res += paragraph[counter];
                    positionPointer++;
                        
                }
                counter += 1;
            }
            
            return paragraph;
        }
    }

   
}

