package org.example.backend.dto;

import org.example.backend.entity.Song;

/*
 * =========================================================
 * Song Response DTO
 * =========================================================
 *
 * Song 데이터를 클라이언트(Next.js)에게 전달할 때 사용하는 DTO다.
 *
 * Entity를 API 응답으로 직접 반환하지 않고 DTO를 따로 사용하는 이유:
 *
 * 1. DB 구조와 API 구조를 분리할 수 있다.
 * 2. 프론트엔드에 필요하지 않은 데이터를 숨길 수 있다.
 * 3. DB 구조가 변경되어도 API 응답 구조에 미치는 영향을 줄일 수 있다.
 *
 * 이 DTO는 데이터를 전달하는 용도이므로
 * 값을 변경할 필요가 없다.
 * 따라서 일반 class보다 간결하게 표현할 수 있는
 * Java record를 사용한다.
 */
public record SongResponse(

        // 노래를 구분하기 위한 PK
        Long songId,

        // 화면에 표시하거나 정답 판정에 사용할 노래 제목
        String title,

        // 노래의 가수명
        String artist,

        // KPOP / JPOP / POP 장르 정보
        String category,

        // 게임에서 재생할 음원 경로
        String audioPath

) {

    /*
     * =====================================================
     * Entity → DTO 변환
     * =====================================================
     *
     * DB에서 조회한 Song Entity를
     * API 응답용 SongResponse로 변환한다.
     *
     * 변환 코드를 Controller 여기저기에 반복해서 작성하지 않고
     * DTO 내부에 변환 메서드를 두어 한 곳에서 관리한다.
     */
    public static SongResponse from(Song song) {

        return new SongResponse(
                song.getSongId(),
                song.getTitle(),
                song.getArtist(),
                song.getCategory(),
                song.getAudioPath()
        );
    }
}