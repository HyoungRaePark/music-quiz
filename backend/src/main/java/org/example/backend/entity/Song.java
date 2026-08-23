package org.example.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/*
 * =========================================================
 * Song Entity
 * =========================================================
 *
 * DB의 song 테이블과 Java 객체를 연결하는 클래스다.
 *
 * 예를 들어 DB의 한 행이
 *
 * song_id = 1
 * title = "Supernova"
 * artist = "aespa"
 *
 * 라면 JPA가 해당 데이터를 Song 객체 하나로 변환해준다.
 */
@Entity
@Table(name = "song")
@Getter
@NoArgsConstructor
public class Song {

    /*
     * song 테이블의 Primary Key.
     *
     * @Id
     * → 이 필드가 Entity의 PK라는 의미다.
     *
     * @GeneratedValue
     * → DB의 AUTO_INCREMENT를 사용한다.
     *   새로운 노래를 INSERT할 때 Java에서 songId를 직접 만들지 않고
     *   MySQL이 번호를 생성하도록 한다.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "song_id")
    private Long songId;


    /*
     * 노래 제목.
     *
     * DB 컬럼명이 title이고 Java 필드명도 title이기 때문에
     * 사실 @Column을 생략해도 매핑할 수 있다.
     *
     * 하지만 현재는 DB와 Entity의 대응 관계를 명확하게 보기 위해
     * 컬럼명을 직접 작성한다.
     *
     * 커버곡이 존재할 수 있으므로 title은 UNIQUE가 아니다.
     */
    @Column(name = "title", nullable = false)
    private String title;


    // 노래 아티스트
    @Column(name = "artist", nullable = false)
    private String artist;


    /*
     * 노래 장르.
     *
     * DB에는 KPOP / JPOP / POP 중 하나가 저장된다.
     *
     * HARD는 장르가 아니라 게임 출제 모드이므로
     * song.category에는 HARD를 저장하지 않는다.
     */
    @Column(name = "category", nullable = false)
    private String category;


    /*
     * 실제 음원 파일의 위치.
     *
     * DB에는 음원 자체를 저장하지 않고
     * 음원 파일을 찾을 수 있는 경로만 저장한다.
     */
    @Column(name = "audio_path", nullable = false)
    private String audioPath;


    /*
     * 노래의 사용 여부.
     *
     * true  → 게임 출제 가능
     * false → 게임 출제 제외
     *
     * 노래를 바로 DELETE하지 않고 비활성화할 수 있게 만든 필드다.
     */
    @Column(name = "is_active", nullable = false)
    private Boolean isActive;


    /*
     * 노래 데이터가 등록된 시간.
     *
     * MySQL DATETIME을 Java에서는 LocalDateTime으로 매핑한다.
     */
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
}