using Anchor_Editor_Backend.Models;
using System.Collections.Generic;
using System.Collections;

namespace Anchor_Editor_Backend.Repository
{
    public interface IAnchorRepository
    {
        IList<Anchor> AnchorList { get; set; }

        public Anchor GetAnchorByTimestamp(string timestamp);

        public IList<Anchor> GetAnchorsByLocation(int location);

        public void DeleteAnchorByTimestamp(string timestamp);

        public void AddAnchorByTimestamp(string timestamp, int location);

        public void EditAnchor(string originalTimestamp, int originalLocation, string destinationTimestamp, int destinationLocation);

        public Hashtable NestedAnchorsByLocation();
    }
}
