using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProEventos.Application.DTOS
{
    public class EventoDto
    {
        public int Id { get; set; }
        public string Local { get; set; }
        public string DataEvento { get; set; }
        [
            Required(ErrorMessage = "O campo {0} é obrigatório"),
            MinLength(3, ErrorMessage = "{0} deve ter no mínimo 4 caracteres"),
            MaxLength(50, ErrorMessage = "{0} deve ter no máximo 50 caracteres"),
        ]
        public string Tema { get; set; }
        [
            Display(Name = "Quantidade de Pessoas"),
            Range(1, 120000, ErrorMessage = "{0} não pode ser menor que 1 e maior que 120.000")
        ]
        public int QtdPessoas { get; set; }
        [
            RegularExpression(@".*\.(gif|jpe?g|bmp|png)$",
             ErrorMessage = "Não é uma Imagem válida. (gif, jpg, jpeg, png ou bmp)")
        ]
        public string ImagemURL { get; set; }
        [
            Required(ErrorMessage = "O Campo {0} é obrigatório"),
            Phone(ErrorMessage = " O {0} é inválido")
        ]
        public string Telefone { get; set; }
        
        [
            Required(ErrorMessage = "O campo {0} é obrigatório"),
            Display(Name = "e-mail"),
            EmailAddress(ErrorMessage ="O campo {0} deve ser um email válido")
        ]
        public string Email { get; set; }
        public IEnumerable<LoteDto> Lote { get; set; }
        public IEnumerable<RedeSocialDto> RedesSociais { get; set; }
        public IEnumerable<PalestranteDto> Palestrantes { get; set; }

    }
}