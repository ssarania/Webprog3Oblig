package oslomet.webprog3oblig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BillettRepository {

    @Autowired
    public JdbcTemplate db;

    public void lagreBillett(Billett billett) {
        String sql = "INSERT INTO Billett (antall, film, fornavn, etternavn, telefonnr, epost)" +
                "VALUES (?,?,?,?,?,?)";
        db.update(sql, billett.getAntall(), billett.getFilm(), billett.getFornavn(), billett.getEtternavn(),
                billett.getTelefonnr(), billett.getEpost());
    }

    public List<Billett> hentAlle() {
        String sql = "SELECT * FROM Billett ORDER BY etternavn ASC"; // Endring her
        List<Billett> alleBilletter = db.query(sql, new BeanPropertyRowMapper(Billett.class));
        return alleBilletter;
    }

    public void slettAlleBilletter() {
        String sql = "DELETE FROM Billett";
        db.update(sql);
    }
}
