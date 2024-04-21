package oslomet.webprog3oblig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class BillettController {
    // lager en liste med billettene i en ArrayList

    @Autowired
    private BillettRepository rep;

    @PostMapping("/lagBillett")
    public void lagreBillett (Billett billett) {
        rep.lagreBillett(billett);
    }

    @GetMapping("/hentAlle")
    public List<Billett> hentAlle() {
        return rep.hentAlle();
    }

    @PostMapping("/slettAlle")
    public void slettAlle() {
        rep.slettAlleBilletter();
    }
}