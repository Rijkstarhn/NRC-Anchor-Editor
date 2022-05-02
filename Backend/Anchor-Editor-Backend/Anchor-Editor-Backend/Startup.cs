using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Anchor_Editor_Backend.Repository;
using Anchor_Editor_Backend.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Anchor_Editor_Backend
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers(setupAction => { setupAction.ReturnHttpNotAcceptable = true; })
                .AddXmlSerializerFormatters();
            //    .AddXmlDataContractSerializerFormatters()
            //    .AddXmlDataContractSerializerFormatters(); //Request Header: allow using XMLs
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Anchor_Editor_Backend", Version = "v1" });
            });

            services.AddSingleton<IXmlRepository, XmlRepository>();
            services.AddSingleton<IAnchorRepository, AnchorRepository>();
            services.AddTransient<IXmlDeserializationService, XmlDeserializationService>();
            services.AddTransient<IXmlSerializationService, XmlSerializationService>();

            services.AddCors(options =>
            {
                options.AddPolicy("AllowOrigin", options => options.AllowAnyOrigin());
            });

            services.AddCors(options =>
            {
                options.AddPolicy("AllowOrigin",
                                  builder =>
                                  {
                                      builder
                                          .AllowAnyOrigin()
                                          .AllowAnyHeader()
                                          .AllowAnyMethod()
                                          //.AllowCredentials()
                                          ;
                                  });
            });



        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Anchor_Editor_Backend v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseCors(options => options.AllowAnyOrigin());

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            
        }
    }
}