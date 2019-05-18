using System;
using System.Collections.Generic;
using System.Web.Mvc;
using UrbaBase.Documents;
using UrbaBase.Models;
using UrbaBase.Repositories;

namespace Front.Controllers
{
    public class HomeController : Controller
    {
        private readonly ISomeRepo _someRepo;
        
        public HomeController(ISomeRepo someRepo)
        {
            _someRepo = someRepo;
        }

        public ActionResult Index()
        {
            return View();

        }
    }
}
