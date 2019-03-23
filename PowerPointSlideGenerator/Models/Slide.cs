using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PowerPointSlideGenerator.Models
{
    public class Slide
    {
        private string name;
        private string title;
        private List<string> images;

        public Slide(string name, string title, List<string> images)
        {
            this.name = name;
            this.title = title;
            this.images = images;
        }
    }
}
