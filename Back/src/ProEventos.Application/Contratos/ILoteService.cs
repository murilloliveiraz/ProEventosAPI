using System.Threading.Tasks;
using ProEventos.Application.DTOS;
using ProEventos.Domain;

namespace ProEventos.Application.Contratos
{
    public interface ILoteService
    {
        Task<LoteDto[]> SaveLotes(int eventoId, LoteDto[] models);
        Task<bool> DeleteLote(int eventoId, int loteId);
        Task<LoteDto[]> GetLotesByEventoIdAsync(int eventoId);
        Task<LoteDto> GetLotesByIdAsync(int eventoId, int loteId);
    }
}