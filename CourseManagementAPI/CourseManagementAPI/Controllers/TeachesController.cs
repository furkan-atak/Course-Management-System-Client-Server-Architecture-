using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CourseManagementAPI.Models;

namespace CourseManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeachesController : ControllerBase
    {
        private readonly CourseManagementDBContext _context;

        public TeachesController(CourseManagementDBContext context)
        {
            _context = context;
        }

        // GET: api/Teaches
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Teach>>> GetTeaches()
        {
            return await _context.Teaches.ToListAsync();
        }

        // GET: api/Teaches/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Teach>> GetTeach(int id)
        {
            var teach = await _context.Teaches.FindAsync(id);

            if (teach == null)
            {
                return NotFound();
            }

            return teach;
        }

        // PUT: api/Teaches/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTeach(int id, Teach teach)
        {
            if (id != teach.Id)
            {
                return BadRequest();
            }

            _context.Entry(teach).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TeachExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok();
        }

        // POST: api/Teaches
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Teach>> PostTeach(Teach teach)
        {
            _context.Teaches.Add(teach);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTeach", new { id = teach.Id }, teach);
        }

        // DELETE: api/Teaches/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTeach(int id)
        {
            var teach = await _context.Teaches.FindAsync(id);
            if (teach == null)
            {
                return NotFound();
            }

            _context.Teaches.Remove(teach);
            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool TeachExists(int id)
        {
            return _context.Teaches.Any(e => e.Id == id);
        }
    }
}
