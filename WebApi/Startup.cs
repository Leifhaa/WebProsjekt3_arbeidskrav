using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using WebApi.Models;
using WebApi.Services;
using Microsoft.Extensions.Options;



namespace WebApi
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
            services.AddControllers();

            services.Configure<WebApiDatabaseSettings>(
                Configuration.GetSection(nameof(WebApiDatabaseSettings))
            );

            services.AddSingleton<IWebApiDatabaseSettings>(
                sp => sp.GetRequiredService<IOptions<WebApiDatabaseSettings>>().Value
            );

            services.AddSingleton<GamesService>();
            services.AddSingleton<CommentsService>();

            //Which websites should be allowed to acccess our api
            services.AddCors(
                options => {
                    options.AddPolicy("AllowAll",
                        builder => builder
                            //Allow everything
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                            .AllowAnyOrigin()
                    );
                }
            );
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            //Serve static files such as images.
            app.UseStaticFiles();

            //use 'AllowAll' configuration
            app.UseCors("AllowAll");

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
