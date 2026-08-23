package org.example.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/*
 * =========================================================
 * Web Config
 * =========================================================
 *
 * 프론트엔드와 백엔드가 서로 다른 포트에서 실행되기 때문에
 * 브라우저의 CORS 정책을 통과할 수 있도록 허용 설정을 한다.
 *
 * 현재 개발 환경:
 *
 * Next.js
 * → http://localhost:3000
 *
 * Spring Boot
 * → http://localhost:8080
 *
 * 포트가 다르면 브라우저에서는 서로 다른 Origin으로 판단한다.
 * 따라서 백엔드에서 프론트엔드 Origin을 명시적으로 허용한다.
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    /*
     * CORS 정책을 전역으로 설정한다.
     *
     * /api/** 로 들어오는 API 요청에 대해서만
     * Next.js 개발 서버의 요청을 허용한다.
     *
     * 모든 경로를 무조건 허용하지 않고
     * 실제 API 경로로 범위를 제한한다.
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {

        registry.addMapping("/api/**")

                /*
                 * 현재 로컬 개발용 Next.js 주소.
                 *
                 * 실제 배포 환경에서는
                 * 운영 프론트엔드 도메인으로 변경하거나
                 * 환경변수로 분리할 예정이다.
                 */
                .allowedOrigins("http://localhost:3000")

                /*
                 * 프론트에서 사용할 HTTP 메서드 허용.
                 *
                 * GET    → 조회
                 * POST   → 생성
                 * PUT    → 전체 수정
                 * PATCH  → 일부 수정
                 * DELETE → 삭제
                 */
                .allowedMethods(
                        "GET",
                        "POST",
                        "PUT",
                        "PATCH",
                        "DELETE",
                        "OPTIONS"
                )

                /*
                 * 요청 헤더를 허용한다.
                 *
                 * 추후 로그인 인증을 붙이면
                 * Authorization 헤더 등이 사용될 수 있다.
                 */
                .allowedHeaders("*")

                /*
                 * 현재는 쿠키 기반 인증을 아직 구현하지 않았으므로
                 * credentials는 활성화하지 않는다.
                 *
                 * 나중에 인증 방식을 정한 뒤 필요하면 추가한다.
                 */
                .maxAge(3600);
    }
}