package org.example.backend.repository;

import org.example.backend.entity.Song;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SongRepository extends JpaRepository<Song, Long> {

    /*
     * 특정 장르이면서 활성화된 노래만 조회한다.
     *
     * 예:
     * category = KPOP
     * AND is_active = true
     */
    List<Song> findByCategoryAndIsActiveTrue(String category);

    /*
     * 장르 구분 없이 활성화된 노래 전체를 조회한다.
     *
     * HARD 모드에서 사용한다.
     */
    List<Song> findByIsActiveTrue();
}