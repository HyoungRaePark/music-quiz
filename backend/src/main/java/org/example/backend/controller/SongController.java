package org.example.backend.controller;

import org.example.backend.dto.SongResponse;
import org.example.backend.service.SongService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/*
 * =========================================================
 * Song Controller
 * =========================================================
 *
 * 노래 관련 HTTP 요청을 처리한다.
 *
 * Controller는 직접 DB에 접근하지 않고
 * Service에게 필요한 데이터를 요청한다.
 *
 * 그리고 Entity가 아니라
 * API 응답 전용 DTO인 SongResponse를 반환한다.
 */
@RestController
@RequestMapping("/api/songs")
public class SongController {

    private final SongService songService;

    /*
     * 생성자 주입.
     *
     * Spring이 SongService 객체를 자동으로 주입한다.
     */
    public SongController(SongService songService) {
        this.songService = songService;
    }

    /*
     * GET /api/songs
     *
     * category가 없으면 전체 노래를 조회한다.
     *
     * 예:
     * GET /api/songs
     */
    @GetMapping
    public List<SongResponse> getSongs(
            @RequestParam(required = false) String category
    ) {

        /*
         * category 파라미터가 없거나
         * 빈 문자열이면 전체 조회를 실행한다.
         */
        if (category == null || category.isBlank()) {
            return songService.getAllSongs();
        }

        /*
         * category가 있으면 게임용 조회 로직을 실행한다.
         *
         * KPOP / JPOP / POP
         * → 해당 장르의 활성 곡
         *
         * HARD
         * → 모든 장르의 활성 곡
         */
        return songService.getPlayableSongsByCategory(category);
    }
}