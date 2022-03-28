﻿using System;
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
    public class TakesController : ControllerBase
    {
        private readonly CourseManagementDBContext _context;

        public TakesController(CourseManagementDBContext context)
        {
            _context = context;
        }

        // GET: api/Takes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Take>>> GetTakes()
        {
            return await _context.Takes.ToListAsync();
        }

        // GET: api/Takes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Take>> GetTake(int id)
        {
            var take = await _context.Takes.FindAsync(id);

            if (take == null)
            {
                return NotFound();
            }

            return take;
        }

        // PUT: api/Takes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTake(int id, Take take)
        {
            if (id != take.Id)
            {
                return BadRequest();
            }

            _context.Entry(take).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TakeExists(id))
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

        // POST: api/Takes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Take>> PostTake(Take take)
        {
            _context.Takes.Add(take);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTake", new { id = take.Id }, take);
        }

        // DELETE: api/Takes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTake(int id)
        {
            var take = await _context.Takes.FindAsync(id);
            if (take == null)
            {
                return NotFound();
            }

            _context.Takes.Remove(take);
            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool TakeExists(int id)
        {
            return _context.Takes.Any(e => e.Id == id);
        }
    }
}
