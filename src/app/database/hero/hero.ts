import * as grpc from 'grpc';
import { Observable } from 'rxjs';
/** Namespace hero. */
export namespace hero {

    /** Contains all the RPC service clients. */
    export interface ClientFactory {

        /**
         * Returns the HeroService service client.
         */
        getHeroService(): hero.HeroService;
    }

    /** Builder for an RPC service server. */
    export interface ServerBuilder {

        /**
         * Adds a HeroService service implementation.
         * @param impl HeroService service implementation
         */
        addHeroService(impl: hero.HeroService): hero.ServerBuilder;
    }

    /** Properties of a Hero. */
    export interface Hero {

        /** Hero id */
        id?: (number|null);

        /** Hero name */
        name?: (string|null);
    }

    /** Properties of a Heros. */
    export interface Heros {

        /** Heros list */
        list?: (hero.Hero[]|null);
    }

    /** Properties of a HeroById. */
    export interface HeroById {

        /** HeroById id */
        id?: (number|null);
    }

    /** Properties of a HeroAttack. */
    export interface HeroAttack {

        /** HeroAttack hero */
        hero?: (string|null);

        /** HeroAttack name */
        name?: (string|null);

        /** HeroAttack demage */
        demage?: (number|null);
    }

    /** Properties of a HeroGreeting. */
    export interface HeroGreeting {

        /** HeroGreeting hero */
        hero?: (string|null);

        /** HeroGreeting message */
        message?: (string|null);
    }

    /** Properties of a HeroInjured. */
    export interface HeroInjured {

        /** HeroInjured hero */
        hero?: (string|null);

        /** HeroInjured demage */
        demage?: (number|null);
    }

    /** Properties of a HeroGreetingGroup. */
    export interface HeroGreetingGroup {

        /** HeroGreetingGroup greet */
        greet?: (hero.HeroGreeting[]|null);
    }

    /** Constructs a new HeroService service. */
    export interface HeroService {

        /**
         * Calls Insert.
         * @param request Hero message or plain object
         *  * @param metadata Optional metadata
         * @returns Promise
         */
        insert(request: hero.Hero, metadata?: grpc.Metadata): Observable<hero.Hero>;

        /**
         * Calls FindById.
         * @param request HeroById message or plain object
         *  * @param metadata Optional metadata
         * @returns Promise
         */
        findById(request: hero.HeroById, metadata?: grpc.Metadata): Observable<hero.Hero>;

        /**
         * Calls Attack.
         * @param request HeroById message or plain object
         *  * @param metadata Optional metadata
         * @returns Promise
         */
        attack(request: hero.HeroById, metadata?: grpc.Metadata): Observable<hero.HeroAttack>;

        /**
         * Calls Greet.
         * @param request HeroGreeting message or plain object
         *  * @param metadata Optional metadata
         * @returns Promise
         */
        greet(request: hero.HeroGreeting, metadata?: grpc.Metadata): Observable<hero.HeroGreetingGroup>;

        /**
         * Calls Combat.
         * @param request HeroAttack message or plain object
         *  * @param metadata Optional metadata
         * @returns Promise
         */
        combat(request: hero.HeroAttack, metadata?: grpc.Metadata): Observable<hero.HeroInjured>;
    }
}
