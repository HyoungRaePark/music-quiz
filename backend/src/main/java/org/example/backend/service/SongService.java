package org.example.backend.service;

import org.example.backend.dto.SongResponse;
import org.example.backend.entity.Song;
import org.example.backend.repository.SongRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/*
 * =========================================================
 * Song Service
 * =========================================================
 *
 * 노래와 관련된 비즈니스 로직을 담당한다.
 *
 * Controller는 요청/응답,
 * Repository는 DB 접근,
 * Service는 서비스 규칙과 데이터 가공을 담당한다.
 *
 * 여기서는 Repository에서 조회한 Song Entity를
 * 프론트엔드에 전달하기 전에 SongResponse DTO로 변환한다.
 */
@Service
public class SongService {

    private final SongRepository songRepository;

    /*
     * 생성자 주입.
     *
     * Spring이 SongRepository 구현 객체를 자동으로 만들어
     * SongService 생성 시 전달한다.
     */
    public SongService(SongRepository songRepository) {
        this.songRepository = songRepository;
    }

    /*
     * =====================================================
     * 전체 노래 조회
     * =====================================================
     *
     * DB에서 모든 Song Entity를 조회한 뒤
     * API 응답용 SongResponse DTO로 변환한다.
     *
     * Entity 자체를 Controller에 넘기지 않는 이유는
     * DB 구조와 API 응답 구조를 분리하기 위해서다.
     */
    public List<SongResponse> getAllSongs() {

        return songRepository.findAll()
                .stream()
                .map(SongResponse::from)
                .toList();
    }

    /*
     * =====================================================
     * 게임용 장르별 노래 조회
     * =====================================================
     *
     * 일반 모드:
     * KPOP / JPOP / POP
     * → 해당 장르이면서 활성화된 곡만 조회
     *
     * HARD:
     * → 장르 조건 없이 활성화된 전체 곡 조회
     *
     * HARD는 DB의 song.category 값이 아니라
     * 게임 모드이기 때문에 Service 계층에서 분기한다.
     */
    public List<SongResponse> getPlayableSongsByCategory(String category) {

        /*
         * 프론트에서 kpop / KPOP처럼
         * 대소문자가 다르게 들어와도 동일하게 처리한다.
         */
        String normalizedCategory = category.toUpperCase();

        /*
         * HARD는 KPOP / JPOP / POP 전체 출제 모드다.
         *
         * 따라서 특정 category 조건 없이
         * 활성화된 곡 전체를 조회한다.
         */
        if ("HARD".equals(normalizedCategory)) {
            return songRepository.findByIsActiveTrue()
                    .stream()
                    .map(SongResponse::from)
                    .toList();
        }

        /*
         * 일반 장르 모드.
         *
         * category가 일치하면서
         * is_active = true인 곡만 조회한다.
         */
        return songRepository
                .findByCategoryAndIsActiveTrue(normalizedCategory)
                .stream()
                .map(SongResponse::from)
                .toList();
    }
}