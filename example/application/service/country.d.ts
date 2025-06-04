declare namespace service.country {
  function create(dto: domain.country.Creation): Promise<domain.country.Entity>;
  function getByCode(code: string): Promise<domain.country.Entity>;
}
