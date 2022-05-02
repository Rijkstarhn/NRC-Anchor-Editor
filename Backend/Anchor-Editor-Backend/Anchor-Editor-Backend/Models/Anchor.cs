using System;

namespace Anchor_Editor_Backend.Models
{
    public class Anchor
    {
        public string Timestamp { get; set; }
        public int Location { get; set; }

        public Anchor(string timestamp, int location)
        {
            Timestamp = timestamp;
            Location = location;
        }

        public override string ToString()
        {
            return $"<anchor time=\"{Timestamp}\" />";
        }

        public void Returns(Anchor anchor1)
        {
            throw new NotImplementedException();
        }
    }
}
