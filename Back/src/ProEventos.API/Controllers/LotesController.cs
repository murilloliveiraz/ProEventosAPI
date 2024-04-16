﻿using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using ProEventos.Application.Contratos;
using ProEventos.Domain;
using ProEventos.Application.DTOS;

namespace ProEventos.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LotesController : ControllerBase
    {
        private readonly ILoteService _loteService;
        public LotesController(ILoteService LoteService)
        {
            _loteService = LoteService;
        }

        [HttpGet("{eventoId}")]
        public async Task<IActionResult> Get(int eventoId)
        {
            try
            {
                var lotes = await _loteService.GetLotesByEventoIdAsync(eventoId);
                if (lotes == null) return NoContent();

                return Ok(lotes);
            }
            catch (Exception ex)
            {
                
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuperar Lotes: {ex.Message}");
            }
        }
        
        [HttpPut("{eventoId}")]
        public async Task<IActionResult> SaveLotes(int eventoId, LoteDto[] models)
        {
            try
            {
                var lotes = await _loteService.SaveLotes(eventoId, models);
                if (lotes == null) return NotFound("Nenhum Lote com esse id encontrado");

                return Ok(lotes);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar salvar Lotes. Erro: {ex.Message}");
            }
        }
        
        [HttpDelete("{eventoId}/{loteId}")]
        public async Task<IActionResult> Delete(int eventoId, int loteId)
        {
            try
            {
                var lote = await _loteService.GetLotesByIdAsync(eventoId, loteId);
                if (lote == null) return NoContent();

                return await _loteService.DeleteLote(lote.EventoId, lote.Id) 
                    ? Ok(new { message = "Lote Deletado"})
                    : BadRequest("Ocorreu um problema nao específico ao tentar deletar o lote");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar deletar Lotes. Erro: {ex.Message}");
            }
        }

    }
}
