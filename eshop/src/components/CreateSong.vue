<template>
    <v-layout>
        <v-flex xs6>
            <panel title="Tao moi">
                <v-text-field
                    label="title"
                    required
                    :rules="[required]"
                    v-model="song.title">
                </v-text-field>
                <v-select
                    :items="artists"
                    required
                    :rules="[notEmpty]"
                    label="Standard"
                    v-model="song.Artist"
                    item-text="name"
                >
                </v-select>
            </panel>
        </v-flex>
        <v-flex xs8>
            <panel title="the panel title next to " class="ml-2">
                <v-text-field
                    label="title"
                    v-model="song.title"
                    multi-line>
                </v-text-field>
                <v-text-field
                    label="title"
                    v-model="song.title"
                    multi-line>
                </v-text-field>
            </panel>
            <div class="danger-alert">
                {{error}}
            </div>
            <v-btn
                dark
                class="cyan"
                @click="create">
                Tao
            </v-btn>
        </v-flex>
    </v-layout>
</template>

<script>
import Panel from './Panel.vue'
import ArtistService from '../services/ArtistService'
import SongService from '../services/SongService'
export default {
    data () {
        return {
            song: {
                title: '',
                Artist: {
                    name: ''
                },
                ArtistId: null
            },
            artists: [],
            error: null,
            required: (value) => !!value || 'Required.',
            notEmpty: (value) => value.name !== '' || 'Required.'
        }
    },
    methods: {
        async create () {
            this.error = null
            this.song.ArtistId = this.song.Artist.id
            const areAllFieldsAreFilledIn = Object
            .keys(this.song)
            .every(key => !!this.song[key])

            if (!areAllFieldsAreFilledIn) {
                this.error = 'Please fill in all the required fields.'
                return
            }
            try {
                console.log(this.song)
                const res = await SongService.create(this.song)
                this.$router.push({
                    name: 'songs'
                })
            console.log(res)
            } catch (error) {
                console.log(error)
            }
        }
    },
    components: {
        Panel
    },
    async mounted () {
        const res = await ArtistService.findAll()
        this.artists = res.data
        console.log(this.artist)
    }
}
</script>

<style>

</style>
