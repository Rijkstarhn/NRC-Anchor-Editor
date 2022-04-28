using Anchor_Editor_Backend.Models;
using System.Collections.Generic;
using System.Linq;
using System;
using System.Collections;

namespace Anchor_Editor_Backend.Repository
{
    public class AnchorRepository : IAnchorRepository
    {
        public IList<Anchor> AnchorList { get; set; }

        public Hashtable NestedAnchorsByLocation ()
        {
            Hashtable nestedAnchors = new Hashtable();

            foreach(Anchor anchor in AnchorList)
            {
                if (nestedAnchors[anchor.Location] == null)
                {
                    nestedAnchors[anchor.Location] = anchor.ToString();
                }
                else
                {
                    nestedAnchors[anchor.Location] += anchor.ToString();
                }
            }
            return nestedAnchors;
        }

        public Anchor GetAnchorByTimestamp(string timestamp)
        {
            Anchor anchor = AnchorList.Where(x => x.Timestamp == timestamp).FirstOrDefault();
            return anchor;
        }

        public IList<Anchor> GetAnchorsByLocation(int location)
        {
            IList<Anchor> anchor = AnchorList.Where(x => x.Location == location).ToList();
            return anchor;
        }

        public void DeleteAnchorByTimestamp(string timestamp)
        {
            var anchorsToRemove = AnchorList.Where(x => x.Timestamp == timestamp).ToList();
            foreach (var anchor in anchorsToRemove)
                AnchorList.Remove(anchor);
        }

        public void AddAnchorByTimestamp(string timestamp, int location)
        {
            newAnchorVerification(timestamp, location);

            Anchor anchor = new Anchor(timestamp, location);    
            AnchorList.Add(anchor);

            IEnumerable<Anchor> sortedEnum = AnchorList.OrderBy(f => f.Timestamp);
            AnchorList = sortedEnum.ToList();
        }

        public void EditAnchor(string originalTimestamp, int originalLocation, string destinationTimestamp, int destinationLocation)
        {
            newAnchorVerification(destinationTimestamp, destinationLocation);

            Anchor anchor = AnchorList.Where(x => x.Timestamp == originalTimestamp && x.Location == originalLocation).FirstOrDefault();
            anchor.Timestamp = destinationTimestamp;
            anchor.Location = destinationLocation;

            IEnumerable<Anchor> sortedEnum = AnchorList.OrderBy(f => f.Timestamp);
            AnchorList = sortedEnum.ToList();
        }

        public void newAnchorVerification(string originalTimestamp, int originalLocation)
        {
            bool pass = true;
            if (AnchorList.Any(x => x.Timestamp == originalTimestamp))
            {
                throw new InvalidOperationException("This timestamp already exists");
            }

            List<Anchor> sortedEnum = AnchorList.OrderBy(f => f.Timestamp).ToList();
            if (sortedEnum.Count() >= 2)
            {
                for (int i = 0; i < sortedEnum.Count() - 1; i++)
                {
                    int j = i + 1;
                    string startTimestamp = sortedEnum[i].Timestamp;
                    string endTimestamp = sortedEnum[j].Timestamp;
                    
                    if (float.Parse(startTimestamp.Remove(startTimestamp.Length - 1)) < float.Parse(originalTimestamp.Remove(originalTimestamp.Length - 1)) && float.Parse(endTimestamp.Remove(endTimestamp.Length - 1)) > float.Parse(originalTimestamp.Remove(originalTimestamp.Length - 1)))
                    {
                        if (originalLocation > sortedEnum[j].Location || originalLocation < sortedEnum[i].Location)
                        {
                            throw new InvalidOperationException("The new location is not legal based on your timestamp: it should be in the range of two existing anchors " + sortedEnum[i].Timestamp + " and " + sortedEnum[j].Timestamp);
                        }
                    }
                }
            }

        }
    }
}
