using System;
using System.Linq;
using System.Threading.Tasks;
using ProEventos.Application.Contratos;
using ProEventos.Domain;
using ProEventos.Persistence.Contratos;
using ProEventos.Application.DTOS;
using System.Collections.Generic;
using AutoMapper;

namespace ProEventos.Application
{
    public class LoteService : ILoteService
    {
        private readonly IGeralPersist _geralpersist;
        private readonly ILotePersist _lotePersist;
        private readonly IMapper _mapper;

        public LoteService(IGeralPersist geralPersist, ILotePersist lotePersist, IMapper mapper)
        {
            _geralpersist = geralPersist;
            _lotePersist = lotePersist;
            _mapper = mapper;
        }

        public async Task AddLote(int eventoId, LoteDto model)
        {
            try
            {
                var lote = _mapper.Map<Lote>(model);
                lote.EventoId = eventoId;

                _geralpersist.Add<Lote>(lote);

                await _geralpersist.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        public async Task<LoteDto[]> SaveLotes(int eventoId, LoteDto[] models)
        {
            try
            {
                var lotes = await _lotePersist.GetLotesByEventoIdAsync(eventoId);
                if (lotes == null) return null;

                foreach (var model in models)
                {
                    if (model.Id == 0)
                    {
                        await AddLote(eventoId, model);
                    }
                    else
                    {
                        var lote = lotes.FirstOrDefault(lote => lote.Id == model.Id);
                        model.EventoId = eventoId;

                        _mapper.Map(model, lote);

                        _geralpersist.Update<Lote>(lote);

                        await _geralpersist.SaveChangesAsync();
                    }
                }

                var loteRetorno = await _lotePersist.GetLotesByEventoIdAsync(eventoId);

                return _mapper.Map<LoteDto[]>(loteRetorno);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        
        public async Task<bool> DeleteLote(int eventoId, int loteId)
        {
            try
            {
                var lote = await _lotePersist.GetLoteByIdsAsync(eventoId, loteId);
                if (lote == null) throw new Exception("O Lote a ser deletado não foi encontrado");

                _geralpersist.Delete<Lote>(lote);
                return await _geralpersist.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                
                throw new Exception(ex.Message);
            }
        } 

        public async Task<LoteDto[]> GetLotesByEventoIdAsync(int eventoId)
        {
            try
            {
                var lotes = await _lotePersist.GetLotesByEventoIdAsync(eventoId);
                if ( lotes == null) return null;

                var LotesRetorno = new List<LoteDto>();

                var resultado = _mapper.Map<LoteDto[]>(lotes);
                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<LoteDto> GetLotesByIdAsync(int eventoId, int loteId)
        {
            try
            {
                var lote = await _lotePersist.GetLoteByIdsAsync(eventoId, loteId);
                if ( lote == null) return null;

                var resultado = _mapper.Map<LoteDto>(lote);
                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}